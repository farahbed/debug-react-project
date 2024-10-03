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
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Nom")).toBeInTheDocument();
    expect(screen.getByLabelText("Prénom")).toBeInTheDocument();
    expect(screen.getByLabelText("Personel / Entreprise")).toBeInTheDocument();
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      //remplir les champs du formulaire
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "test@test" },
      })
      fireEvent.change(screen.getByLabelText("Nom"), {
        target: { value: "test" },
      })
      fireEvent.change(screen.getByLabelText("Prénom"), {
        target: { value: "test" },
      })
      fireEvent.change(screen.getByLabelText("Personel / Entreprise"), {
        target: { value: "test" },
      })

      // Attendre et simuler le clic sur le bouton "Envoyer"
      const submitButton = screen.getByText("Envoyer");
      fireEvent.click(submitButton);

      // Vérifier les messages après soumission
      await waitFor(() => {
        expect(screen.getByText("En cours")).toBeInTheDocument();
        expect(screen.getByText("Message envoyé !")).toBeInTheDocument();
      });
    });
  });
});
