export const formatAmount = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0
  }).format(amount)

export const formatNumber = (number) => new Intl.NumberFormat().format(number)
