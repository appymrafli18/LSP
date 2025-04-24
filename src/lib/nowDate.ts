export default function getCurrentDateTime(dateTimeLocal?: string) {
  let now;

  if (dateTimeLocal) {
    now = new Date(dateTimeLocal);
  } else {
    now = new Date();
  }

  return now.toISOString();
}
