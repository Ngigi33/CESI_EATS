const path = require('path');

exports.downloadComponent = async (req, res) => {
  const component = await Component.findById(req.params.id);
  if (!component) return res.status(404).json({ error: "Composant non trouvé" });

  const filePath = path.join(__dirname, '..', 'components', component.fileUrl);
  res.download(filePath);
};
