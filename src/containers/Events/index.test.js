import { fireEvent, render, screen } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

describe("When Events is created", () => {
  it("a list of event cards is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Events />
      </DataProvider>
    );
    // Vérifie que la date "avril" est affichée
    await screen.findByText(/avril/i);
  });

  describe("and an error occurred", () => {
    it("an error message is displayed", async () => {
      api.loadData = jest.fn().mockRejectedValue(new Error("Erreur"));
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );
      // Vérifie que le message d'erreur est affiché
      expect(await screen.findByText(/An error occured/i)).toBeInTheDocument();
    });
  });

  describe("and we select a category", () => {
    it("a filtered list is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(data);
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );

      // Vérifie que "Forum #productCON" est affiché avant la sélection de la catégorie
      await screen.findByText("Forum #productCON");

      // Simule l'ouverture du collapse
      fireEvent.click(await screen.findByTestId("collapse-button-testid"));

      // Simule la sélection d'une catégorie, ici "soirée entreprise"
      fireEvent.click(await screen.findByText("soirée entreprise"));

      // Vérifie que "Conférence #productCON" est toujours affichée et que "Forum #productCON" a été filtrée
      await screen.findByText("Conférence #productCON");
      expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
    });
  });

  describe("and we click on an event", () => {
    it("the event detail is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(data);
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );

      // Simule un clic sur l'événement "Conférence #productCON"
      fireEvent.click(await screen.findByText("Conférence #productCON"));

      // Vérifie que les détails de l'événement sont affichés
      await screen.findByText("24-25-26 Février");
      await screen.findByText("1 site web dédié");
    });
  });
});
