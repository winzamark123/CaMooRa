export interface Profile {
    user: User   
    userId: string 
    firstName: string 
    lastName: string 
    profilePicURL?: string 
}

export interface Contact {
    user: User  
    userId: string
    email: string 
    discord?: string
    instagram?: string
    phone?: string
    whatsApp?: string
    isPublic: boolean 
    isPhotographer: boolean
}

export interface User {
    id: string;
    clerkId: string;
    profile?: Profile;
    contact?: Contact;
}