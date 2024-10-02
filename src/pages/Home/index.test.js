import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);

    // Attendre que l'état de chargement disparaisse
    await waitFor(() => {
      expect(screen.queryByText("Chargement des données...")).not.toBeInTheDocument();
    });

    // Attendre que le conteneur du formulaire soit présent
    await waitFor(() => {
      expect(screen.getByTestId("container-form-testid")).toBeInTheDocument();
    });

    // Vérifier la présence des champs
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Nom")).toBeInTheDocument();
    expect(screen.getByText("Prénom")).toBeInTheDocument();
    expect(screen.getByText("Personel / Entreprise")).toBeInTheDocument();
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);

      // Attendre et simuler le clic sur le bouton "Envoyer"
      const submitButton = await screen.findByText("Envoyer");
      fireEvent.click(submitButton);

      // Vérifier les messages après soumission
      await waitFor(() => {
        expect(screen.getByText("En cours")).toBeInTheDocument();
        expect(screen.getByText("Message envoyé !")).toBeInTheDocument();
      });
    });
  });
});
