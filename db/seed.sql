

\c find_spot_database
INSERT INTO findspot (full_name, latitude, longitude, description, emergency, date, archived)
VALUES
  ('Sample Spot 1', '51.5074', '-0.1278', 'A scenic spot near the river', 'Medical Emergencies', '2023-10-26', false),
  ('Sample Spot 2', '40.7128', '-74.0060', 'A famous city square', 'Medical Emergencies', '2023-10-27', false),
  ('Sample Spot 3', '34.0522', '-118.2437', 'A beach location', 'Medical Emergencies', '2023-10-28', true);
