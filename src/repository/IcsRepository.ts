import axios from "axios";

// IcsRepository.ts
class IcsRepository {
	async crawlNaver(request: any, onSuccess?: any, onError?: any, element?: any) {
		return axios.get(`/terran/ics/crawl/naver`)
			.then(response => onSuccess && onSuccess(request, response.data, element))
			.catch(error => onError && onError(request, error, element));
	}
	async createCalendar(request: any, onSuccess?: any, onError?: any, element?: any) {
		return axios.post("/terran/ics/calendar", request)
			.then(response => onSuccess && onSuccess(request, response.data, element))
			.catch(error => onError && onError(request, error, element));
	}
	async searchCalendar(request: any, onSuccess?: any, onError?: any, element?: any) {
		return axios.post("/terran/ics/calendar/search", request)
			.then(response => onSuccess && onSuccess(request, response.data, element))
			.catch(error => onError && onError(request, error, element));
	}

	async batch(request: any, onSuccess?: any, onError?: any, element?: any) {
		return axios.post("/terran/ics/batch", request)
			.then(response => onSuccess && onSuccess(request, response.data, element))
			.catch(error => onError && onError(request, error, element));
	}
	async create(request: any, onSuccess?: any, onError?: any, element?: any) {
		return axios.post("/terran/ics", request)
			.then(response => onSuccess && onSuccess(request, response.data, element))
			.catch(error => onError && onError(request, error, element));
	}
	async search(request: any, onSuccess?: any, onError?: any, element?: any) {
		return axios.post("/terran/ics/search", request)
			.then(response => onSuccess && onSuccess(request, response.data, element))
			.catch(error => onError && onError(request, error, element));
	}
	async update(request: any, onSuccess?: any, onError?: any, element?: any) {
		return axios.put("/terran/ics/" + request.id, request)
			.then(response => onSuccess && onSuccess(request, response.data, element))
			.catch(error => onError && onError(request, error, element));
	}
	async remove(request: any, onSuccess?: any, onError?: any, element?: any) {
		return axios.delete(`/terran/ics/${request.id}`)
			.then(response => onSuccess && onSuccess(request, response.data, element))
			.catch(error => onError && onError(request, error, element));
	}
	async upload(request: any, onSuccess?: any, onError?: any, element?: any) {
		const data = new FormData();
		data.append("file", request.file);
		return axios.post(`/terran/ics/${request.vcalendarId}/upload`, data)
			.then(response => onSuccess && onSuccess(request, response.data, element))
			.catch(error => onError && onError(request, error, element));
	}
	async download(request?: any, onSuccess?: any, onError?: any, element?: any) {
		return axios({
			url: "/terran/ics/download",
			method: "GET",
			responseType: "blob",
		}).then(response => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", request);
			document.body.appendChild(link);
			link.click();
			link.parentNode!.removeChild(link);
			onSuccess && onSuccess(request, response.data, element);
		})
			.catch(error => onError && onError(request, error, element));
	}
	async downloadIcs(request: any, onSuccess?: any, onError?: any, element?: any) {
		return axios({
			url: `/terran/ics/${request.vcalendarId}/download-ics`,
			method: 'GET',
			responseType: 'blob',
		}).then(response => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', request.filename);
			document.body.appendChild(link);
			link.click();
			link.parentNode!.removeChild(link);
			onSuccess && onSuccess(request, response.data, element);
		})
		.catch(error => onError && onError(request, error, element));
	}
	async deduplicate(request: any, onSuccess?: any, onError?: any, element?: any) {
		return axios.post(`/terran/ics/${request.vcalendarId}/deduplicate`)
			.then(response => onSuccess && onSuccess(request, response.data, element))
			.catch(error => onError && onError(request, error, element));
	}
	async backup(request: any, onSuccess?: any, onError?: any, element?: any) {
		return axios.get(`/terran/ics/backup`)
			.then(response => onSuccess && onSuccess(request, response.data, element))
			.catch(error => onError && onError(request, error, element));
	}
}
export default new IcsRepository();
