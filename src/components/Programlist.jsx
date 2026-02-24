import React, { useMemo, useState } from 'react';
import Programcard from './Programcard';
import Programdetails from './Programdetails';
import Filterbar from './Filterbar';

const Programlist = ({ programs, subjects }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState(programs[0] || null);

  const visiblePrograms = useMemo(() => {
    return programs.filter((program) => {
      const query = search.toLowerCase();
      const matchesSearch =
        program.code.toLowerCase().includes(query) ||
        program.name.toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'all' || program.status === statusFilter;
      const matchesType = typeFilter === 'all' || program.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [programs, search, statusFilter, typeFilter]);

  return (
    <div className="module-layout">
      <div>
        <div className="module-head">
          <h2>Program Listing</h2>
          <p>Browse, filter, and inspect all available academic programs.</p>
        </div>
        <Filterbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Search program code"
          filters={[
            {
              key: 'status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { value: 'all', label: 'All status' },
                { value: 'active', label: 'Active' },
                { value: 'under review', label: 'Under review' },
                { value: 'phased out', label: 'Phased out' },
              ],
            },
            {
              key: 'type',
              value: typeFilter,
              onChange: setTypeFilter,
              options: [
                { value: 'all', label: 'All types' },
                { value: "Bachelor's", label: "Bachelor's" },
                { value: 'Diploma', label: 'Diploma' },
              ],
            },
          ]}
        />

        <div className="cards-grid">
          {visiblePrograms.map((program) => (
            <Programcard
              key={program.id}
              program={program}
              isActive={selectedProgram?.id === program.id}
              onSelect={setSelectedProgram}
            />
          ))}
        </div>
      </div>

      <Programdetails program={selectedProgram} subjects={subjects} />
    </div>
  );
};

export default Programlist;
