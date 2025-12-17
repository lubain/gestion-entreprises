export const GetLocaleDate = () => {
    const now = new Date();
    // Ajuster pour le fuseau horaire local
    const localDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
    return localDate;
};
