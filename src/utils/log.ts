export const productionLog = (label: string, ...args: string[]) => {
  console.log(
    `%c ${label} %c ${args.join(' ')} %c`,
    'background:#677b8c; padding: 1px; border-radius: 3px 0 0 3px; color: #000',
    'background:#3c4751; padding: 1px; border-radius: 0 3px 3px 0; color: #fff',
    'background:transparent'
  );
};

export const log = (label: string, ...args: string[]) => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production') {
    productionLog(label, ...args);
  }
};

export default log;
