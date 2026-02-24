let = enterviewList = [];
let = rejectedList = [];

let currentStatus = 'all-btn';

let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const totalCards = document.getElementById('all-cards');

const mainContainer = document.querySelector('main');

const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');

const interviewSection = document.getElementById('interview-section');
const rejectedSection = document.getElementById('rejected-section');


function totalCardsCount() {
    totalCount.innerText = totalCards.children.length;
    interviewCount.innerText = interviewSection.children.length;
    rejectedCount.innerText = rejectedSection.children.length;
}

totalCardsCount()

function btnToggle(id) {

    allBtn.classList.add('bg-gray-400')
    interviewBtn.classList.add('bg-gray-400')
    rejectedBtn.classList.add('bg-gray-400')

    const selected = document.getElementById(id);
    currentStatus = id;
    
    selected.classList.remove('bg-gray-400');
    selected.classList.add('bg-[#3B82F6]');

    if (id == 'interview-btn') {
        mainContainer.classList.add('hidden');
        interviewSection.classList.remove('hidden');
        rejectedSection.classList.add('hidden');
        renderInterview()
    } else if (id == 'all-btn') {
        mainContainer.classList.remove('hidden');
        interviewSection.classList.add('hidden');
        rejectedSection.classList.add('hidden');
    } else if (id == 'rejected-btn') {
        rejectedSection.classList.remove('hidden');
        mainContainer.classList.add('hidden');
        interviewSection.classList.add('hidden')
        renderRejected()
    }
}

mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('btn-interview')) {

        const parentNode = event.target.parentNode.parentNode.parentNode;

        const jobPosition = parentNode.querySelector('.job-position').innerText;
        const companyDetails = parentNode.querySelector('.company').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const applicationStatus = parentNode.querySelector('.application-status').innerText;
        const jobDescription = parentNode.querySelector('.job-description').innerText;


        parentNode.querySelector('.application-status').innerText = 'APPLIED'

        const cardInfo = {
            jobPosition,
            companyDetails,
            salary,
            applicationStatus: 'APPLIED',
            jobDescription,
        }

        const jobPostExist = enterviewList.find(item => item.jobPosition == cardInfo.jobPosition && item.companyDetails == cardInfo.companyDetails);

        if (!jobPostExist) {
            enterviewList.push(cardInfo)
        }
        
        rejectedList = rejectedList.filter(item => item.jobPosition != cardInfo.jobPosition)
                
        if(currentStatus == 'rejected-btn'){
            renderRejected()
        }
        
        totalCardsCount()
    }


    else if (event.target.classList.contains('btn-rejected')) {

        const parentNode = event.target.parentNode.parentNode.parentNode;

        const jobPosition = parentNode.querySelector('.job-position').innerText;
        const companyDetails = parentNode.querySelector('.company').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const applicationStatus = parentNode.querySelector('.application-status').innerText;
        const jobDescription = parentNode.querySelector('.job-description').innerText;

        parentNode.querySelector('.application-status').innerText = 'REJECTED'

        const cardInfo = {
            jobPosition,
            companyDetails,
            salary,
            applicationStatus: 'REJECTED',
            jobDescription,
        }

        const jobPostExist = rejectedList.find(item => item.jobPosition == cardInfo.jobPosition && item.companyDetails == cardInfo.companyDetails);

        if (!jobPostExist) {
            rejectedList.push(cardInfo)
        }
        
        enterviewList = enterviewList.filter(item => item.jobPosition != cardInfo.jobPosition)
        
        if(currentStatus == 'interview-btn'){
            renderInterview()
        }
        
        totalCardsCount()    
    }

});

function renderInterview() {
    interviewSection.innerHTML = ''

    for (let interview of enterviewList) {
        let div = document.createElement('div');
        div.className = 'bg-white rounded-lg p-6 flex justify-between'
        div.innerHTML = `
           <div>
                <div class="space-y-3">
                    <h3 class="job-position text-2xl font-bold">${interview.jobPosition}</h3>
                    <p class="company text-[#64748B]">${interview.companyDetails}</p>
                    <p class="slary text-[#64748B]">${interview.salary}</p>
                    <div class="application-status bg-[#eef4ff] w-[120px] text-center rounded-sm">
                        <p class="uppercase">${interview.applicationStatus}</p>
                    </div>
                    <p class="Job-description text-[#64748B]">${interview.jobDescription}</p>
                </div>
                <div class="mt-5 flex gap-3">
                    <button
                        class="btn-interview border-green-500 border text-green-500 p-2 rounded-lg uppercase">Interview</button>
                    <button
                        class="btn-rejected border-red-500 border text-red-500 p-2 rounded-lg uppercase">Rejected</button>
                </div>
            </div>
            <div class="border border-[#F1F2F4] h-8 w-14 rounded-full text-center pt-1">
                <i class="fa-solid fa-trash-can"></i>
            </div>
        `
        interviewSection.appendChild(div);
    }
};

function renderRejected() {
    interviewSection.innerHTML = ''

    for (let rejected of rejectedList) {
        let div = document.createElement('div');
        div.className = 'bg-white rounded-lg p-6 flex justify-between'
        div.innerHTML = `
           <div>
                <div class="space-y-3">
                    <h3 class="job-position text-2xl font-bold">${rejected.jobPosition}</h3>
                    <p class="company text-[#64748B]">${rejected.companyDetails}</p>
                    <p class="slary text-[#64748B]">${rejected.salary}</p>
                    <div class="application-status bg-[#eef4ff] w-[120px] text-center rounded-sm">
                        <p class="uppercase">${rejected.applicationStatus}</p>
                    </div>
                    <p class="Job-description text-[#64748B]">${rejected.jobDescription}</p>
                </div>
                <div class="mt-5 flex gap-3">
                    <button
                        class="btn-interview border-green-500 border text-green-500 p-2 rounded-lg uppercase">Interview</button>
                    <button
                        class="btn-rejected border-red-500 border text-red-500 p-2 rounded-lg uppercase">Rejected</button>
                </div>
            </div>
            <div class="border border-[#F1F2F4] h-8 w-14 rounded-full text-center pt-1">
                <i class="fa-solid fa-trash-can"></i>
            </div>
        `
        rejectedSection.appendChild(div);
    }
};