import HistoryComp from "./HistoryComp.jsx";
import { useEffect, useState } from "react";

function History({user}) {
    // const histories = [
    //     { name: "Test", color: ['#f44336', '#2196f3', '#4caf50', '#ffeb3b', '#9c27b0'], date: "2023-10-01" },
    //     { name: "Test2", color: ['#708090', '#808000', '#C08081', '#9DC183', '#483C32', '#4682B4', '#B0C4DE', '#B2BEB5', '#E0B0FF', '#36454F'], date: "2023-10-02" },
    //     { name: "Test3", color: ['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C0C0C0'], date: "2023-10-03" },
    //     { name: "Test4", color: ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD'], date: "2023-10-04" },
    //     { name: "Test5", color: ['#FF4500', '#32CD32', '#1E90FF', '#FFD700', '#8A2BE2'], date: "2023-10-05" }
    // ]

    const [histories, setHistoryList] = useState([]);

    useEffect(() => {
    // 發送請求到後端 API 拿到所有 history
    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/history/get/${user}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!res.ok) throw new Error("Failed to fetch history");
        const data = await res.json();
        console.log(data);
        setHistoryList(data);
      } catch (err) {
        throw new Error(err.message || "An error occurred while fetching history");
      } finally {
        //
      }
    };

    fetchHistory();
  }, [user]);

    return (
        <>
            <div className="w-full">
                <p>History</p>
                {histories.map((history, index) => (
                    <HistoryComp
                        key={index}
                        name={history.description}
                        color={history.color}
                        date={history.createdAt ? new Date(history.createdAt).toLocaleDateString() : "Unknown Date"}
                    />
                ))}
            </div>
        </>
    );
}

export default History;