import { useMutation } from '@tanstack/react-query';
import apiClient, { TOKEN_KEY } from '../api/client'
import type { LoginDto, LoginResponse} from '../types/auth';

async function loginRequest(credentials: LoginDto): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);
    return response.data;
}

export function useLogin() {
    return useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            localStorage.setItem(TOKEN_KEY, data.token);
        }
    })
}