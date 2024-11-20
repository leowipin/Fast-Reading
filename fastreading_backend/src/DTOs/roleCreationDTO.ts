interface roleCreationDTO {
    name: string;
    permissions: string[];
}

export const transformRoleCreationDTO = (input: roleCreationDTO): roleCreationDTO => {
    const {name, permissions} = input;
    return{
        name,
        permissions
    }
}