import { createRouter } from "next-connect";
import controller from "infra/controllers.js";
import user from "models/user.js";
import { use } from "react";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  // api/v1/users/[username]
  const username = request.query.username;
  const userFound = await user.findOneByUsername(username);

  return response.status(200).json(userFound);
}
