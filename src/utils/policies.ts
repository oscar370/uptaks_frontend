import type { Project, User } from "../types";

export const isManager = (
  managerId: Project["manager"],
  userId: User["_id"]
) => {
  return managerId === userId;
};
