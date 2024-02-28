// Remote Token NFM9XSXFTRCA68M0UD3HARUQZA3D2X0ED55X011J

const STORAGE_TOKEN = "NFM9XSXFTRCA68M0UD3HARUQZA3D2X0ED55X011J";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

async function setItem(key, value) {
    const payload = {key, value, token: STORAGE_TOKEN};
    return fetch(STORAGE_URL, {
        method: "POST",
        body: JSON.stringify(payload),
    }).then((res) => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url)
        .then((res) => res.json())
        .then((res) => {
            if (res.data) {
                return res.data.value;
            }
            throw `Could not find data with key "${key}".`;
        });
}
