export async function storeCredentialsInBrowser (email:string, password:string) {
    if ((window as any).PasswordCredential) {
        const cred = new (window as any).PasswordCredential({
          id: email,
          password: password,
        });
        await (navigator as any).credentials.store(cred);
    }
}