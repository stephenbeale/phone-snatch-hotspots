# Phone Snatch Hotspots - Roadmap

## Bugs

- [x] **Form obscures map after pin drop** - ~~After clicking on the map to drop a pin, the Report Form card covers the entire screen including the map.~~ Fixed: Form now slides in as a side panel (desktop) or bottom sheet (mobile), keeping the map and pin visible.

## Features

- [x] **Address geocoding** - ~~When user selects "Enter Address", implement actual address lookup.~~ Fixed: Uses Nominatim (OpenStreetMap) API with debounced search, London-bounded results, and dropdown selection.

- [ ] **Latest submissions overlay** - Add a toggleable text view overlay showing the most recent incident submissions (location, date, time, description).

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
