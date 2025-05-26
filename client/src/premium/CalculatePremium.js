import ratingTable from './ratingTable.json'; // we'll convert your Excel to JSON

export function calculatePremium(quote) {
  const match = ratingTable.find(row =>
    row['Coverage Type'] === quote.coverageType &&
    row['Extended CFI'] === quote.extendedCFI &&
    row['AOPA Member'] === quote.isAopaMember &&
    row['Certificate & Ratings'] === quote.certificateRatings &&
    row['Instrument Rating'] === quote.instrumentRating &&
    quote.overallHours >= row['Total Hours (Min 200)'] &&
    quote.twelveMonthsHours >= row['Hours (Last 12 Months)']
  );

  if (!match) return { error: 'No matching rating found.' };

  const premium = match['Base Rate (USD)'] * match['Multiplier'];

  return {
    premium,
    bodilyInjury: match['Bodily Injury & Property Damage'],
    nonOwnedDamage: match['Physical Damage to Non-Owned Aircraft'],
    medical: match['Medical Payment'],
  };
}
