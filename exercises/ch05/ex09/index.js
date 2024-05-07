export function parseJsonString(input) {
  try {
    const parsedData = JSON.parse(input);
    return {
      success: true,
      data: parsedData,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}