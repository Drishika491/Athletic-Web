import axios from 'axios'
import { getCookie, setCookie, BASE_URL } from './config'
import run from './hmac'
import { getToken } from '../utils/auth';

export const config = async () => {
    const xauth = await run('GET');

    return {
        'X-Auth': xauth,
        'X-Auth-Date': localStorage.getItem('xauthdate'),
        'X-Request-Id': localStorage.getItem('xrequestid')
    }
}

export const configSigned = async () => {
    const xauth = await run('GET');
    const userToken = getToken();

    return {
        'X-Auth': xauth,
        'X-Auth-Date': localStorage.getItem('xauthdate'),
        'X-Request-Id': localStorage.getItem('xrequestid'),
        'Authorization': `Bearer ${userToken}`
    }
}

export const configPOST = async () => {
    const xauth = await run('POST');

    return {
        'X-Auth': xauth,
        'X-Auth-Date': localStorage.getItem('xauthdate'),
        'X-Request-Id': localStorage.getItem('xrequestid'),
        'Content-Type': 'application/json',
    }
}

export const configPOSTFormData = async () => {
    const xauth = await run('POST');

    return {
        'X-Auth': xauth,
        'X-Auth-Date': localStorage.getItem('xauthdate'),
        'X-Request-Id': localStorage.getItem('xrequestid'),
        'Content-Type': 'multipart/form-data',
    }
}

export const configEventRegister = async () => {
  const xauth = await run('POST');
  const userToken = getToken(); // Get the user token from local storage

  return {
    'X-Auth': xauth,
    'X-Auth-Date': localStorage.getItem('xauthdate'),
    'X-Request-Id': localStorage.getItem('xrequestid'),
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userToken}` // Include the user token in the Authorization header
  };
};

export const configTokenFirebase = async () => {
    const xauth = await run('POST');

    return {
        'X-Auth': xauth,
        'X-Auth-Date': localStorage.getItem('xauthdate'),
        'X-Request-Id': localStorage.getItem('xrequestid')
    }
}

export const configSubmitFile = async (token) => {
    const xauth = await run('POST');

    return {
        'X-Auth': xauth,
        'X-Auth-Date': localStorage.getItem('xauthdate'),
        'X-Request-Id': localStorage.getItem('xrequestid'),
        'reCaptchaToken': token, // menambahkan token ke header reCaptchaToken
    }
}

export async function getMenu() {
    return axios.get(BASE_URL+'Api/PublicMenu/GetList', {
        headers: await config(),
    })
}

export async function getSponsor(typeName) {
    const request = {
        SponerType: typeName
    }
    return axios.get(BASE_URL+'Api/Sponsor/GetList', {
        params: request,
        headers: await config()
    })
}

export async function getArticle() {
    
    return axios.get(BASE_URL+'Api/Article/GetLastArticle?Count=12', {
        headers: await config()
    })
}

export async function getCategories() {
    
    return axios.get(BASE_URL+'Api/ArticleCategory/GetList', {
        headers: await config()
    })
}

export async function getBanner() {
    
    return axios.get(BASE_URL+'Api/Article/GetLastArticle?Count=4', {
        headers: await config()
    })
    
}

// Content Page About Us

export async function getAboutUs() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=3&PublicSubMenuPvid=2', {
        headers: await config()
    })
    
}

export async function getMission() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=3&PublicSubMenuPvid=3', {
        headers: await config()
    })
    
}

export async function getVision() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=3&PublicSubMenuPvid=4', {
        headers: await config()
    })
    
}

export async function getSAConstitution() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=3&PublicSubMenuPvid=11', {
        headers: await config()
    })
    
}

export async function getBoardSubCommitees() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=3&PublicSubMenuPvid=12', {
        headers: await config()
    })
    
}

export async function getCompanyMember() {
    
    return axios.get(BASE_URL+'Api/CompanyMember/GetList', {
        headers: await config()
    })

}

export async function getGetRoleList() {
    
    return axios.get(BASE_URL+'Api/CompanyMember/GetRoleList', {
        headers: await config()
    })

}

export async function getSecretariatStaff() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=3&PublicSubMenuPvid=13', {
        headers: await config()
    })
    
}

export async function getAthletesCommision() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=3&PublicSubMenuPvid=14', {
        headers: await config()
    })
    
}

export async function getAffiliateMembers() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=3&PublicSubMenuPvid=15', {
        headers: await config()
    })
    
}

export async function getPolicies() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=3&PublicSubMenuPvid=16', {
        headers: await config()
    })
    
}

export async function getSafeSport() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=3&PublicSubMenuPvid=17', {
        headers: await config()
    })
    
}

export async function getCorporateSponsors() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=3&PublicSubMenuPvid=18', {
        headers: await config()
    })
    
}

export async function getLatestNews() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=3&PublicSubMenuPvid=19', {
        headers: await config()
    })
    
}

export async function getListNews() {
    
    return axios.get(BASE_URL+'Api/Article/GetLastArticle?Count=9', {
        headers: await config()
    })
}

export async function getListRelatedNews() {
    
    return axios.get(BASE_URL+'Api/Article/GetLastArticle?Count=3', {
        headers: await config()
    })
}

export async function getAnnualGeneralMeeting() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=3&PublicSubMenuPvid=20', {
        headers: await config()
    })
    
}

export async function getGettingSAOffice() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=3&PublicSubMenuPvid=21', {
        headers: await config()
    })
    
}

// Events & Competitions

export async function getCalendar() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=4&PublicSubMenuPvid=5', {
        headers: await config()
    })
    
}

export async function getSAEventsCompetitions() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=4&PublicSubMenuPvid=22', {
        headers: await config()
    })
    
}

export async function getInternationalCompetitions() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=4&PublicSubMenuPvid=23', {
        headers: await config()
    })
    
}

export async function getResultSearch() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=4&PublicSubMenuPvid=24', {
        headers: await config()
    })
    
}

export async function getVolunteeringEvents() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=4&PublicSubMenuPvid=25', {
        headers: await config()
    })
    
}

export async function getEventResources() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=4&PublicSubMenuPvid=26', {
        headers: await config()
    })
    
}

// High Performance

export async function getNationalSquad() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=5&PublicSubMenuPvid=6', {
        headers: await config()
    })
    
}

export async function getAthleteInformation() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=5&PublicSubMenuPvid=27', {
        headers: await config()
    })
    
}

export async function getSelectionPolicy() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=5&PublicSubMenuPvid=28', {
        headers: await config()
    })
    
}

export async function getAntiDoping() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=5&PublicSubMenuPvid=29', {
        headers: await config()
    })
    
}


export async function getIncomeInsurance() {

    return axios.get(BASE_URL + 'Api/PublicContent/GetByMenu?PublicMenuPvid=5&PublicSubMenuPvid=58', {
        headers: await config()
    })

}

export async function getDTEHome() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=5&PublicSubMenuPvid=30', {
        headers: await config()
    })
    
}

export async function getCompetitors() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=5&PublicSubMenuPvid=55', {
        headers: await config()
    })
    
}

export async function getApplyForSanction() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=5&PublicSubMenuPvid=31', {
        headers: await config()
    })
    
}

export async function getSAOctc() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=5&PublicSubMenuPvid=32', {
        headers: await config()
    })
    
}

export async function getSpexCarding() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=5&PublicSubMenuPvid=33', {
        headers: await config()
    })
    
}

export async function getNationalRecords() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=5&PublicSubMenuPvid=34', {
        headers: await config()
    })
    
}

export async function getRegionalTC() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=5&PublicSubMenuPvid=35', {
        headers: await config()
    })
    
}

export async function getHighResource() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=5&PublicSubMenuPvid=36', {
        headers: await config()
    })
    
}

// Coaches

export async function getSACoachRegistry() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=6&PublicSubMenuPvid=7', {
        headers: await config()
    })
    
}

export async function getCoachEdu() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=6&PublicSubMenuPvid=37', {
        headers: await config()
    })
    
}

export async function getCoachingCourses() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=6&PublicSubMenuPvid=38', {
        headers: await config()
    })
    
}

export async function getWorkshopCOP() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=6&PublicSubMenuPvid=39', {
        headers: await config()
    })
    
}

export async function getCoachSG() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=6&PublicSubMenuPvid=40', {
        headers: await config()
    })
    
}

export async function getCoachesResources() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=6&PublicSubMenuPvid=41', {
        headers: await config()
    })
    
}

// Technical Officials

export async function getSATechnicalOfficial() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=7&PublicSubMenuPvid=8', {
        headers: await config()
    })
    
}

export async function getSATechnicalOfficialPolicy() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=7&PublicSubMenuPvid=42', {
        headers: await config()
    })
    
}

export async function getCourses() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=7&PublicSubMenuPvid=43', {
        headers: await config()
    })
    
}

export async function getWorkshops() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=7&PublicSubMenuPvid=44', {
        headers: await config()
    })
    
}

// Kids Athletics

export async function getKidsAthletics() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=8&PublicSubMenuPvid=9', {
        headers: await config()
    })
    
}

export async function getAboutKA() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=8&PublicSubMenuPvid=45', {
        headers: await config()
    })
    
}

export async function getResourceKA() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=8&PublicSubMenuPvid=46', {
        headers: await config()
    })
    
}

// Get Involved

export async function getGetInvolved() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=9&PublicSubMenuPvid=10', {
        headers: await config()
    })
    
}

export async function getContactUs() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=9&PublicSubMenuPvid=47', {
        headers: await config()
    })
    
}

export async function getSAAffiliation() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=9&PublicSubMenuPvid=48', {
        headers: await config()
    })
    
}

export async function getLookForClub() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=9&PublicSubMenuPvid=49', {
        headers: await config()
    })
    
}

export async function getLookForCoach() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=9&PublicSubMenuPvid=50', {
        headers: await config()
    })
    
}

export async function getSAMembership() {
    
    return axios.get(BASE_URL+'Api/PublicContent/GetByMenu?PublicMenuPvid=9&PublicSubMenuPvid=51', {
        headers: await config()
    })
    
}

export async function getSARecords() {

    return axios.get(BASE_URL + 'Api/PublicContent/GetByMenu?PublicMenuPvid=5&PublicSubMenuPvid=53', {
        headers: await config()
    })

}

// Get List AThletes

export async function getListAthlete() {
    
    return axios.get(BASE_URL+'Api/AthleteProfile/GetList?Code=&Name&Gender&CountryPvid&DisciplinePvid=&IsActive&Club&Coach', {
        headers: await config()
    })
    
}

// export const getDetailAthlete = async (pvid) => {
    
//     return axios.get(BASE_URL+'Api/AthleteProfile/GetById?Pvid=${pvid}', {
//         headers: await config()
//     })
    
// }

export async function getAchievement() {
    
    return axios.get(BASE_URL+'Api/AthleteAchievement/GetList', {
        headers: await config()
    })
    
}