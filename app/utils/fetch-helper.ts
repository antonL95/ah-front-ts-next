export const fetchData = (endpoint: string, query: string) => {
    return fetch(
        `${process.env.apiHost}/${endpoint}?${query}`,
        {
            headers: {
                "Authorization": `Bearer ${process.env.apiKey}`,
            },
        });
}
