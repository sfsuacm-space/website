
function _cleanOrgName(name: string): string {
  return name
    .toLowerCase()             // Convert all characters to lowercase
    .replace(/[^a-z0-9]/g, ''); // Remove anything that's not a letter or number
}


export default function getOrganizationLogo(organizationName: string): string { 
    return `/assets/squircles/${_cleanOrgName(organizationName)}-squircle.png`;
}