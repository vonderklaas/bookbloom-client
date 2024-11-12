type HeaderProps = {
    openModal: () => void;
    setIsAddMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header = ({ setIsAddMode, openModal }: HeaderProps) => {

    const handleAddBook = () => {
        console.log('handleAddBook')
        setIsAddMode(true)
        openModal();
    }

    const loginUser = () => {
        // Example using localStorage and a global context or state
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: 'someone@gmail.com', password: '1234' })
        })
            .then(response => response.json())
            .then(data => {
                if (data.user_id) {
                    // Store user data
                    console.log('data', data)
                    // localStorage.setItem('user_id', data.user_id);
                    // localStorage.setItem('username', data.username);
                    // Set global state for user if needed
                    // setUser({ id: data.user_id, username: data.username });
                } else {
                    console.error(data.error || 'Login failed');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <header className="header">
            <h2>bookbloom</h2>
            <nav>
                <button onClick={handleAddBook}>
                    Add book
                </button>
                <button onClick={loginUser}>
                    Login
                </button>
            </nav>
        </header>
    )
}