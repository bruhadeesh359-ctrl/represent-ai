import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getDisputes = async () => {
  const res = await api.get('/api/disputes');
  return res.data;
};

export const getDispute = async (id: string) => {
  const res = await api.get(`/api/disputes/${id}`);
  return res.data;
};

export const startInvestigation = async (disputeId: string) => {
  const res = await api.post(`/api/investigations/${disputeId}/investigate`);
  return res.data;
};

export const generatePdf = async (investigationId: string) => {
  const res = await api.post(`/api/documents/${investigationId}/generate-pdf`);
  return res.data;
};

export const downloadPdf = async (investigationId: string) => {
  const res = await api.get(`/api/documents/${investigationId}/download-pdf`, {
    responseType: 'blob',
  });
  return res.data;
};

export const submitResponse = async (investigationId: string) => {
  const res = await api.post(`/api/documents/${investigationId}/submit`);
  return res.data;
};

export const getBenchmarks = async () => {
  const res = await api.get('/api/benchmarks');
  return res.data;
};
