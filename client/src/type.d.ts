type User  = {
    id : string;
    name : string;
    email : string;
    role : 'CANDIDATE' | 'ADMIN' | 'RECRUITER';
    profileImage : string | null;
    posts: Post[];
    candidate?: Candidate;
    recruiter?: Recruiter;
    pastEmployer?: Employer[];
}

type Post = {
    id: number;
    title: string;
    description: string;
    skills : string[];
    image: null | string;
    duration : number;
    experience : number;
    location: string;
    remote: boolean;
    company: string;
    offerMin: number;
    offerMax: number;
    startDate: string;
    createdAt: string;
    updatedAt: string;
}

type Project = {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link: string | null;
}

type Education = {
    degree: string;
    institution: string;
    yearOfPassing: number;
}

type Employer = {
    companyName: string;
    position: string;
    startDate: string;
    endDate: string | null;
    description: string;
}

type Candidate = {
    id: string;
    domain: string;
    userId: string;
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

type Recruiter = {
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