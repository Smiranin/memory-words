export function joinClasses(styles: { [key: string]: boolean }, ...existed: string[]): string {
  const classes = Object.entries(styles)
    .filter(([key, val]) => val)
    .map(([key]) => key);

  const res = existed.join(' ') + ' ' + classes.join(' ');
  return res;
}
