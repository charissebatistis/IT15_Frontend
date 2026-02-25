import React, { useMemo, useState } from 'react';
import Programdetails from './Programdetails';
import Filterbar from './Filterbar';

const Programlist = ({ programs, subjects }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('code-asc');
  const [selectedProgramId, setSelectedProgramId] = useState(programs[0]?.id || null);

  const visiblePrograms = useMemo(() => {
    const filtered = programs.filter((program) => {
      const query = search.toLowerCase();
      const matchesSearch =
        program.code.toLowerCase().includes(query) ||
        program.name.toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'all' || program.status === statusFilter;
      const matchesType = typeFilter === 'all' || program.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });

    const sorted = [...filtered];
    if (sortFilter === 'units-desc') {
      sorted.sort((a, b) => b.totalUnits - a.totalUnits);
    } else if (sortFilter === 'date-desc') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      sorted.sort((a, b) => a.code.localeCompare(b.code));
    }
    return sorted;
  }, [programs, search, statusFilter, typeFilter, sortFilter]);

  const selectedProgram =
    visiblePrograms.find((program) => program.id === selectedProgramId) || visiblePrograms[0] || null;

  return (
    <div className="module-layout">
      <div>
        <div className="module-head">
          <h2>Program Listing</h2>
          <p>Browse, filter, and inspect all available academic programs.</p>
        </div>

        <div className="section-insights">
          <span className="insight-pill">Showing {visiblePrograms.length} of {programs.length} programs</span>
          <span className="insight-pill">Status: {statusFilter === 'all' ? 'Any' : statusFilter}</span>
          <span className="insight-pill">Type: {typeFilter === 'all' ? 'Any' : typeFilter}</span>
          <span className="insight-pill">Sort: {sortFilter}</span>
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
            {
              key: 'sort',
              value: sortFilter,
              onChange: setSortFilter,
              options: [
                { value: 'code-asc', label: 'Sort: Code (A-Z)' },
                { value: 'units-desc', label: 'Sort: Units (High-Low)' },
                { value: 'date-desc', label: 'Sort: Newest' },
              ],
            },
          ]}
        />

        {visiblePrograms.length ? (
          <div className="table-shell">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Program</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Duration</th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                {visiblePrograms.map((program) => (
                  <tr
                    key={program.id}
                    className={selectedProgram?.id === program.id ? 'selected' : ''}
                    onClick={() => setSelectedProgramId(program.id)}
                  >
                    <td>
                      <strong>{program.code}</strong>
                    </td>
                    <td>{program.name}</td>
                    <td>{program.type}</td>
                    <td>
                      <span className={`status-badge ${program.status.replace(' ', '-')}`}>
                        {program.status}
                      </span>
                    </td>
                    <td>{program.duration}</td>
                    <td>{program.totalUnits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">No programs match your filters. Try broadening your search.</div>
        )}
      </div>

      <Programdetails program={selectedProgram} subjects={subjects} />
    </div>
  );
};

export default Programlist;
