export const formatParameterizedString = (formattedURL, replacementsObj) => {
  return formattedURL.replace(
    /{\w+}/g,
    placeholder => replacementsObj[placeholder.substring(1, placeholder.length - 1)] ?? placeholder
  );
};

export const formatParameterizedURL = (
  formattedURL = '',
  replacementsObj = {},
  queryString = ''
) => {
  let encodeQueryString = queryString;

  return formatParameterizedString(formattedURL + encodeQueryString, replacementsObj);
};
