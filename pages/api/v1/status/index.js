function status(request, response) {
  response.status(200).json({ desc: "sao acima da media" });
}

export default status;
