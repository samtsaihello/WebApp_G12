import { Box, Tooltip } from "@mui/material";

export default function HistoryComp({name, color = [], date}) {

    // const colors = ['#f44336', '#2196f3', '#4caf50', '#ffeb3b', '#9c27b0'];

    return (
        <>
            <div className="w-5/6 bg-gray-600 rounded-lg p-3 m-2">
                <div className="flex mb-2">
                    <h2 className="mr-4">{name}</h2>  
                    <h2 id="date">{date}</h2>
                </div>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {color.map((color) => (
                        <Tooltip key={color} title={color} arrow>
                        <Box
                            sx={{
                            width: 24,
                            height: 24,
                            bgcolor: color,
                            borderRadius: 1,
                            // border: '1px solid #ccc',
                            cursor: 'pointer',
                            }}
                        />
                        </Tooltip>
                    ))}
                </Box>
            </div>
        </>
    )
}