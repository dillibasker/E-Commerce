import natural from "natural";

const TfIdf = natural.TfIdf;

export const getRecommendations = (products, targetId) => {
  const tfidf = new TfIdf();

  products.forEach(p => {
    tfidf.addDocument(
      `${p.name} ${p.category || ""} ${p.description || ""}`
    );
  });

  const targetIndex = products.findIndex(
    p => p._id.toString() === targetId
  );

  if (targetIndex === -1) return [];

  const scores = [];

  tfidf.tfidfs(
    `${products[targetIndex].name} ${products[targetIndex].category || ""} ${products[targetIndex].description || ""}`,
    (i, measure) => {
      if (i !== targetIndex) {
        scores.push({ product: products[i], score: measure });
      }
    }
  );

  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(s => s.product);
};
