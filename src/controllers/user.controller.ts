import { Context } from "koa";
import { confirmSignUp, signIn, signUp } from "../config/cognito";
import { User } from "../entities/user.entity";
import * as bcrypt from "bcryptjs";
import { AppDataSource } from "../data-source";
import * as jwt from 'jsonwebtoken';
import 'dotenv/config'

export const userController = {
  async auth(ctx: Context): Promise<any> {
    const { name, password, email } = ctx.request.body;
    const userRepository = AppDataSource.getRepository(User);

    try {
      let user = await userRepository.findOne({ where: { email } });


      if (user) {
        const signInResult = await signIn(email, password);
        const token = jwt.sign({userId: user.cognitoId, role: user.role}, process.env.JWT_SECRET!, { expiresIn: signInResult.AuthenticationResult?.ExpiresIn})
        ctx.body = { token };
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const signUpResult = await signUp(email, password);

        console.log(signUpResult)

        user = new User();
        user.name = name;
        user.email = email;
        user.password = hashedPassword;
        user.cognitoId = signUpResult.UserSub;
        user.isOnboarded = false;

        await userRepository.save(user).then(()=>{
          ctx.body = {
            message: "User registered successfully",
            result: signUpResult,
          };
        });

      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "An error occurred", error };
    }
  },

  async editAccount(ctx: Context): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);
    const userId = ctx.state.user.sub;
    const { name, email, password, role } = ctx.request.body;

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      ctx.status = 404;
      ctx.body = "Usuário não encontrado";
      return;
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (ctx.state.user.role === 'admin' && role)
      user.role = role;

    user.isOnboarded = true;

    await userRepository.save(user);
    ctx.body = user;
  },

  async allUsers(ctx: Context): Promise<any> {
    if (ctx.state.user.role !== 'admin') {
      ctx.status = 403;
      ctx.body = "Acesso negado";
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    ctx.body = users;
  },

  async me(ctx: Context): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);
  const userId = ctx.state.user.userId;

  if (!userId) {
    ctx.status = 401;
    ctx.body = 'Não autorizado';
    return;
  }

  try {
    const user = await userRepository.findOneBy({ cognitoId: userId });

    if (!user) {
      ctx.status = 404;
      ctx.body = 'Usuário não encontrado';
      return;
    }

    ctx.body = {
      id: user.id,
      email: user.email,
      cognitoId: user.cognitoId,
      role: user.role
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Erro interno do servidor';
    console.error(error);
  }
  },

  async confirm(ctx: Context): Promise<any> {
    const { email, confirmationCode } = ctx.request.body;

    try {
      const data = await confirmSignUp(email, confirmationCode);
      ctx.body = {
        message: "User confirmed successfully",
        result: data,
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "An error occurred", error };
    }
  }
};
