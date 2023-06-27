export const isPostContainsSearchQuery = (post, searchQuery) => {
  return post.title.toLowerCase().includes(searchQuery.toLowerCase())
    || post.content.toLowerCase().includes(searchQuery.toLowerCase());
};

export const dateFormatter = strDate => {
  const date = new Date(strDate);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year}, ${hours}:${minutes}`;
};