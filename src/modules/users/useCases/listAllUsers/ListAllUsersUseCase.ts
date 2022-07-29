import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userExists = this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new Error("User does not exists!");
    }
    if (userExists.admin === false) {
      throw new Error("User not allowed!");
    }
    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
