const uploadFile = async (data) => {
  const { buffer, fileName, metaData, folder } = data;
  const { bucket, type } = metaData;
  const PROJECT_ID = process.env.STORAGE_PROJECT_ID;
  const API_KEY = process.env.STORAGE_ROLE_KEY;

  const url = `https://${PROJECT_ID}.supabase.co/storage/v1/object/${bucket}${folder}/${fileName}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      apikey: API_KEY,
      "Content-Type": type,
    },
    body: buffer,
  });

  const result = await response.json();

  if (response.ok) {
    return { error: false };
  } else {
    console.error("Errore upload:", result);
    return { error: true, errorMsg: result };
  }
};
export default uploadFile;
