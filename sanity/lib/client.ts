import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, useCdn, token } from '../env';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  token,
  useCdn,
});

export const clientRead = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});
