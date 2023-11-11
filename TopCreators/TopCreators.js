//data modelling
export const getTopCreators = (creators) => {
    const finalCreators = [];
  
    const finalResults = creators?.reduce((index, currentValue) => {
      (index[currentValue.seller] =index[currentValue.seller] || []).push(currentValue);

return index;
},{});

console.log("finalResults:", finalResults);

Object.entries(finalResults || {}).forEach(([seller, items]) => {
  // Log the current seller and items for debugging
  console.log(`Processing seller: ${seller}`, items);

  if (Array.isArray(items)) {
    const total = items
      .map((newItem) => Number(newItem.price))
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    finalCreators.push({ seller, total });
  } else {
    // Log an error message if 'items' is not an array
    console.error(`Expected an array for seller ${seller}, got:`, items);
  }
});
return finalCreators;



};
