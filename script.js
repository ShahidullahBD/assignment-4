let = enterviewList = [];
let = rejectedList = [];
// console.log(enterviewList);

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

const newArr = [{name: 'arif', age: 35}, {name: 'arif', age: 35},{name: 'arif', age: 35}]
const arrayLength = newArr.length;
console.log(arrayLength);

function btnToggle(id) {
    // remove style of buttons
    // allBtn.classList.remove('bg-[#3B82F6]')
    // interviewBtn.classList.remove('bg-[#3B82F6]')
    // rejectedBtn.classList.remove('bg-[#3B82F6]')

    // adding style of buttons
    allBtn.classList.add('bg-gray-400')
    interviewBtn.classList.add('bg-gray-400')
    rejectedBtn.classList.add('bg-gray-400')

    const selected = document.getElementById(id);
    // console.log(selected);

    selected.classList.remove('bg-gray-400');
    selected.classList.add('bg-[#3B82F6]');

    if (id == 'interview-btn') {
        mainContainer.classList.add('hidden');
        interviewSection.classList.remove('hidden');
        rejectedSection.classList.add('hidden');
    }
    if (id == 'all-btn') {
        mainContainer.classList.remove('hidden');
        interviewSection.classList.add('hidden');
        rejectedSection.classList.add('hidden');
    }
    if (id == 'rejected-btn') {
        rejectedSection.classList.remove('hidden');
        mainContainer.classList.add('hidden');
        interviewSection.classList.add('hidden')
    }


}

mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('btn-interview')) {
        const parentNode = event.target.parentNode.parentNode;
        // console.log(parentNode);

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
            applicationStatus,
            jobDescription,
        }

        // console.log(cardInfo);

        const jobPostExist = enterviewList.find(item => item.jobPosition == cardInfo.jobPosition);


        if (!jobPostExist) {
            enterviewList.push(cardInfo)
        }

        // console.log(enterviewList);

        renderInterview()
    }

});

function renderInterview() {
    interviewSection.innerHTML = ''

    for (let interview of enterviewList) {
        // console.log(interview);
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
}