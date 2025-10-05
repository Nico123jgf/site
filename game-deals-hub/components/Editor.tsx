import React, { useState } from 'react';
import { GameDeal, Platform } from '../types';

interface EditorProps {
  steamDeals: GameDeal[];
  epicDeals: GameDeal[];
  setSteamDeals: React.Dispatch<React.SetStateAction<GameDeal[]>>;
  setEpicDeals: React.Dispatch<React.SetStateAction<GameDeal[]>>;
  onDeleteDeal: (id: number, platform: Platform) => void;
  onClose: () => void;
}

const initialFormState = {
  title: '',
  imageUrl: '',
  dealUrl: '',
  originalPrice: '',
  discountedPrice: '',
  platform: Platform.Steam,
};

const Editor: React.FC<EditorProps> = ({ steamDeals, epicDeals, setSteamDeals, setEpicDeals, onDeleteDeal, onClose }) => {
    const [formState, setFormState] = useState(initialFormState);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormState(prevState => ({ ...prevState, imageUrl: base64String }));
                setImagePreviewUrl(base64String);
            };
            reader.readAsDataURL(file);
        } else {
             setFormState(prevState => ({ ...prevState, imageUrl: '' }));
             setImagePreviewUrl(null);
        }
    };
    
    const handleAddDeal = (e: React.FormEvent) => {
        e.preventDefault();
        const { title, imageUrl, originalPrice, discountedPrice, platform, dealUrl } = formState;

        if (!title || !imageUrl || originalPrice === '' || discountedPrice === '' || !dealUrl) {
            alert('Please fill out all fields and upload an image.');
            return;
        }

        const newDeal: GameDeal = {
            id: Date.now(), // Simple unique ID
            title,
            imageUrl,
            dealUrl,
            originalPrice: parseFloat(originalPrice),
            discountedPrice: parseFloat(discountedPrice),
        };

        if (platform === Platform.Steam) {
            setSteamDeals(prevDeals => [newDeal, ...prevDeals]);
        } else {
            setEpicDeals(prevDeals => [newDeal, ...prevDeals]);
        }
        
        setFormState(prev => ({...initialFormState, platform: prev.platform}));
        setImagePreviewUrl(null);
        const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };
    
    const handleDeleteClick = (idToDelete: number, platform: Platform) => {
        if (!window.confirm('Are you sure you want to delete this deal?')) {
            return;
        }
        // Use the onDeleteDeal function passed down from the App component
        onDeleteDeal(idToDelete, platform);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-[#1b2838] w-full max-w-5xl h-[90vh] rounded-lg shadow-2xl flex flex-col">
                <header className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-2xl font-bold">Content Editor</h2>
                    <button onClick={onClose} className="text-2xl font-bold hover:text-red-500 transition-colors">&times;</button>
                </header>
                <div className="flex-grow p-4 overflow-y-auto">
                    {/* Add New Deal Form */}
                    <div className="bg-gray-900 p-4 rounded-lg mb-6">
                        <h3 className="text-xl font-semibold mb-4">Add New Deal</h3>
                        <form onSubmit={handleAddDeal} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input type="text" name="title" placeholder="Game Title" value={formState.title} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="text" name="dealUrl" placeholder="Deal URL" value={formState.dealUrl} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <select name="platform" value={formState.platform} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value={Platform.Steam}>Steam</option>
                                <option value={Platform.Epic}>Epic Games</option>
                            </select>
                            <input type="number" name="originalPrice" placeholder="Original Price" value={formState.originalPrice} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" step="0.01" />
                            <input type="number" name="discountedPrice" placeholder="Discounted Price" value={formState.discountedPrice} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" step="0.01" />
                            
                            <div className="flex items-center gap-4">
                               <input type="file" id="imageUpload" name="imageFile" accept="image/*" onChange={handleImageChange} className="bg-gray-800 p-2 rounded border border-gray-700 w-full file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
                                {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className="w-16 h-12 object-cover rounded flex-shrink-0" />}
                            </div>

                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors md:col-span-3">Add Deal</button>
                        </form>
                    </div>

                    {/* Deal Lists */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Steam Deals */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-blue-400">Steam Deals</h3>
                            <ul className="space-y-2 h-64 overflow-y-auto pr-2">
                                {steamDeals.map(deal => (
                                    <li key={deal.id} className="bg-gray-800 p-2 rounded flex justify-between items-center">
                                        <span className="truncate flex-1 mr-4">{deal.title}</span>
                                        <button onClick={() => handleDeleteClick(deal.id, Platform.Steam)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs flex-shrink-0">Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Epic Deals */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Epic Games Deals</h3>
                             <ul className="space-y-2 h-64 overflow-y-auto pr-2">
                                {epicDeals.map(deal => (
                                    <li key={deal.id} className="bg-gray-800 p-2 rounded flex justify-between items-center">
                                        <span className="truncate flex-1 mr-4">{deal.title}</span>
                                        <button onClick={() => handleDeleteClick(deal.id, Platform.Epic)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs flex-shrink-0">Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;