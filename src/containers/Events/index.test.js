import { render, screen, fireEvent, act} from '@testing-library/react';
import Events from './index'; // change ./events to ./index
import React from 'react';

describe('When Events is created', () => {
  it('a list of event cards is displayed', async () => {
    // Rendre le composant
    render(<Events />);

    // Vérifier qu'il y a plusieurs occurrences de "avril"
    const months = screen.getAllByText(/avril/);
    expect(months[0]).toBeInTheDocument(); // Vérifier que la première occurrence est affichée
  });

  it('and we select a category, a filtered list is displayed', async () => {
    // Rendre le composant
    render(<Events />);

    // Simuler la sélection d'une catégorie, ici "soirée entreprise"
    await act(async () => {
      const categories = screen.getAllByText("soirée entreprise");
      fireEvent.click(categories[1]); // Cliquer sur la deuxième occurrence
    });

    // Vérifier qu'un élément filtré est toujours visible
    expect(screen.getByText("Conférence #productCON")).toBeInTheDocument();

    // Vérifier qu'un autre élément est filtré
    expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
  });
});
