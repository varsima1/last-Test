// const normalizeUser = rawUser => {
//   const name = { ...rawUser.name, middle: rawUser.name?.middle || "" };

//   const image = {
//     ...rawUser.image,
//     url:
//       rawUser.image.url ||
//       "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
//     alt: rawUser.image.alt || "Business card image",
//   };

//   const address = {
//     ...rawUser.address,
//     state: rawUser.address.state || "not defined",
//   };

//   const user = {
//     ...rawUser,
//     name,
//     image,
//     address,
//   };

//   return user;
// };

// module.exports = normalizeUser;

const normalizeUser = (rawUser) => {
  const name = {
    first: rawUser.name?.first || "",
    middle: rawUser.name?.middle || "",
    last: rawUser.name?.last || "",
  };

  const image = {
    url:
      rawUser.image?.url ||
      "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
    alt: rawUser.image?.alt || "Business card image",
  };

  const address = {
    country: rawUser.address?.country || "",
    city: rawUser.address?.city || "",
    street: rawUser.address?.street || "",
    houseNumber: rawUser.address?.houseNumber || "",
  };

  const user = {
    ...rawUser,
    name,
    image,
    address,
  };

  return user;
};

module.exports = normalizeUser;
