import CourseList from '../components/CourseList';

function HomePage() {
    const courses = [
        {
            id: 1,
            number: 'CSC1700',
            title: 'Introduction to Programming',
            credits: 4,
            description: 'Java programming fundamentals. Variables, loops, methods, arrays, and basic OOP.',
            prerequisites: []
        },
        {
            id: 2,
            number: 'CSC2150',
            title: 'Data Structures',
            credits: 4,
            description: 'Linked lists, stacks, queues, trees, graphs, sorting, and algorithm analysis.',
            prerequisites: [1]
        },
        {
            id: 3,
            number: 'CSC2200',
            title: 'Introduction to Web Development',
            credits: 3,
            description: 'HTML, CSS, JavaScript client-side programming, DOM manipulation, Bootstrap.',
            prerequisites: [1]
        },
        {
            id: 4,
            number: 'CSC2300',
            title: 'Computer Architecture',
            credits: 3,
            description: 'Digital logic, binary arithmetic, CPU organization, memory hierarchy, assembly language.',
            prerequisites: [1]
        },
        {
            id: 5,
            number: 'CSC3250',
            title: 'Object-Oriented Programming',
            credits: 3,
            description: 'OOP principles, inheritance, polymorphism, interfaces, design patterns.',
            prerequisites: [2]
        }
    ];

    return (
        <div className="container mt-4 mb-5">
            <h3 className="mb-3">CS Developer Track</h3>
            <CourseList courses={courses} />
        </div>
    );
}

export default HomePage;