import { createSlice } from '@reduxjs/toolkit';

interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link: string | null;
}

interface Education {
    degree: string;
    institution: string;
    yearOfPassing: number;
}

interface Employer {
    companyName: string;
    position: string;
    startDate: string;
    endDate: string | null;
    description: string;
}

interface Candidate {
    id: string;
    name: string;
    email: string;
    profileImage: string | null;
    skills: string[];
    experience: number;
    education: Education[];
    certificates: string[];
    github: string | null;
    projects : Project[];
    location: string;
    resume: string | null;
    portfolio: string | null;
    pastEmployers: Employer[];
}

interface Recruiter{
    id : string;
    name : string;
    email : string;
    profileImage: string | null;
    company: string | null;
    jobTitle: string | null;
    jobDescription: string | null;
    jobLocation: string | null;
    pastEmployers: Employer[];
}

interface ProfileSliceState {
    candidate: Candidate | null;
    recruiter: Recruiter | null;
    loading: boolean;
    error: string | null;
}

const initialState : ProfileSliceState = {
    candidate: null,
    recruiter : null,
    loading: false,
    error: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setCandidates(state, action) {
            state.candidate = action.payload;
        },
        setCandidateLoading(state, action) {
            state.loading = action.payload;
        },
        setCandidateError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setCandidates, setCandidateLoading, setCandidateError } = profileSlice.actions;
export const selectCandidates = (state: { profile: ProfileSliceState }) => state.profile.candidate;
export const selectRecruiter = (state: { profile: ProfileSliceState }) => state.profile.recruiter;
export const selectCandidateLoading = (state: { profile: ProfileSliceState }) => state.profile.loading;
export const selectCandidateError = (state: { profile: ProfileSliceState }) => state.profile.error;
export default profileSlice.reducer;