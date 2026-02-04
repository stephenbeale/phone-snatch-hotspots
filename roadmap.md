# Phone Snatch Hotspots - Roadmap

## Bugs

- [ ] **Form obscures map after pin drop** - After clicking on the map to drop a pin, the Report Form card covers the entire screen including the map. Users should be able to see their pin location while filling out the form. Consider: side panel layout, smaller modal, or transparent/semi-transparent background showing the map.

## Features

- [ ] **Address geocoding** - When user selects "Enter Address", implement actual address lookup using a geocoding API (e.g., Nominatim, Google Places) to convert street addresses/postcodes to coordinates.

- [ ] **Incident details view** - Allow users to click on hotspots to see details of reported incidents (date, time, description).

- [ ] **Time-based filtering** - Filter heatmap by time period (last 24h, last week, last month, all time).

- [ ] **Incident clustering** - Group nearby incidents and show count badges when zoomed out.

- [ ] **Data persistence** - Move from localStorage to a backend database so incidents are shared across all users.

- [ ] **Incident verification** - Allow users to confirm/verify existing reports to increase confidence.

- [ ] **Safety tips** - Display safety tips based on the area being viewed.

- [ ] **Mobile optimisation** - Improve touch interactions and responsive layout for mobile users.

- [ ] **Export data** - Allow downloading incident data as CSV/JSON for analysis.

## Technical Debt

- [ ] Add unit tests for components
- [ ] Add E2E tests for reporting flow
- [ ] Implement error boundaries
- [ ] Add loading states for async operations
