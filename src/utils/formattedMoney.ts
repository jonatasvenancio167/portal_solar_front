const formattedMoney = (number: number) => {
  const num = typeof number === 'string' ? parseFloat(number) : number;

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return formatter.format(num);
};


export { formattedMoney }