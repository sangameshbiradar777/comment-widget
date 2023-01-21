import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

const getAvatar = async (name) => {
  const avatar = await createAvatar(lorelei, {
    size: 128,
    seed: name,
  }).toDataUri();

  return avatar;
};

export default getAvatar;
