import { Context } from "koa";
import { signIn, signUp } from "../config/cognito";
import { User } from "../entities/user.entity";
import * as bcrypt from "bcryptjs";
import { AppDataSource } from "../data-source";

export const userController = {
  async auth(ctx: Context): Promise<any> {
    const { password, email } = ctx.request.body;
    const userRepository = AppDataSource.getRepository(User);

    try {
      let user = await userRepository.findOne({ where: { email } });


      if (user) {
        const signInResult = await signIn(email, password);
        ctx.body = { data: signInResult };
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const signUpResult = await signUp(email, password);

        console.log(signUpResult)

        user = new User();
        user.email = email;
        user.password = hashedPassword;
        user.cognitoId = signUpResult.UserSub;

        await userRepository.save(user);

        ctx.body = {
          message: "User registered successfully",
          teste: signUpResult,
        };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "An error occurred", error };
    }
  },

  async editAccount(ctx: Context): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);
    const userId = ctx.state.user.sub;
    const { email, password, role } = ctx.request.body;

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      ctx.status = 404;
      ctx.body = "Usuário não encontrado";
      return;
    }

    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10); // Hash da senha
    if (ctx.state.user["cognito:groups"]?.includes("admin") && role)
      user.role = role;

    await userRepository.save(user);
    ctx.body = user;
  },

  async allUsers(ctx: Context): Promise<any> {
    if (!ctx.state.user["cognito:groups"]?.includes("admin")) {
      ctx.status = 403;
      ctx.body = "Acesso negado";
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    ctx.body = users;
  },
};
