const rendezvousModel = require("../model/rendezvousModel");

// Créer un rendez-vous
const createRendezvous = async (req, res) => {
	try {
		const { user_id, date, heure, motif } = req.body;
		if (!user_id || !date || !heure || !motif) {
			return res
				.status(400)
				.json({ message: "Tous les champs sont obligatoires" });
		}

		const newRendezvous = { user_id, date, heure, motif };
		const result = await rendezvousModel.createRendezvous(newRendezvous);

		return res.status(201).json({ message: "Rendez-vous créé", id: result });
	} catch (err) {
		return res
			.status(500)
			.json({ message: "Erreur du serveur", error: err.message });
	}
};

// Récupérer les rendez-vous par userId
const getRendezvousByUserId = async (req, res) => {
	try {
		const userId = req.params.userId;
		const rendezvous = await rendezvousModel.getRendezvousByUserId(userId);

		if (rendezvous.length === 0) {
			return res
				.status(404)
				.json({ message: "Aucun rendez-vous trouvé pour cet utilisateur" });
		}

		return res.status(200).json(rendezvous);
	} catch (err) {
		return res
			.status(500)
			.json({ message: "Erreur du serveur", error: err.message });
	}
};

// Mettre à jour un rendez-vous
const updateRendezvous = async (req, res) => {
	try {
		const { id } = req.params;
		const { date, heure, motif } = req.body;

		if (!date || !heure || !motif) {
			return res
				.status(400)
				.json({ message: "Tous les champs sont obligatoires" });
		}

		const updatedData = { date, heure, motif };
		const result = await rendezvousModel.updateRendezvous(id, updatedData);

		if (result === 0) {
			return res.status(404).json({ message: "Rendez-vous non trouvé" });
		}

		return res.status(200).json({ message: "Rendez-vous mis à jour" });
	} catch (err) {
		return res
			.status(500)
			.json({ message: "Erreur du serveur", error: err.message });
	}
};

// Supprimer un rendez-vous
const deleteRendezvous = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await rendezvousModel.deleteRendezvous(id);

		if (result === 0) {
			return res.status(404).json({ message: "Rendez-vous non trouvé" });
		}

		return res.status(200).json({ message: "Rendez-vous supprimé" });
	} catch (err) {
		return res
			.status(500)
			.json({ message: "Erreur du serveur", error: err.message });
	}
};

module.exports = {
	createRendezvous,
	getRendezvousByUserId,
	updateRendezvous,
	deleteRendezvous,
};
