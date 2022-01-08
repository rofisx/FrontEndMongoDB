let moneyFormat = new Intl.NumberFormat('de-DE')
let moneyFormatIDR = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0})

export {moneyFormat, moneyFormatIDR};