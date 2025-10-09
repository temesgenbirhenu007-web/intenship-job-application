import { useState, useEffect } from 'react';
import { statsAPI } from '../../utils/api';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import { Users, Briefcase, FileText, TrendingUp, UserCheck, Activity } from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await statsAPI.getAdminStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Overview of platform statistics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stats.totalStudents}</h3>
              <p className="text-gray-600 text-sm">Total Students</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-600">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-teal-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stats.totalRecruiters}</h3>
              <p className="text-gray-600 text-sm">Total Recruiters</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-600">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {stats.pendingRecruiters}
              </h3>
              <p className="text-gray-600 text-sm">Pending Approvals</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stats.totalJobs}</h3>
              <p className="text-gray-600 text-sm">Total Jobs</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stats.activeJobs}</h3>
              <p className="text-gray-600 text-sm">Active Jobs</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {stats.totalApplications}
              </h3>
              <p className="text-gray-600 text-sm">Total Applications</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Platform Activity</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">Student Registrations</p>
                    <p className="text-sm text-gray-600">Last 30 days</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">+42</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">New Job Postings</p>
                    <p className="text-sm text-gray-600">Last 30 days</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">+28</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-teal-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">Applications Submitted</p>
                    <p className="text-sm text-gray-600">Last 30 days</p>
                  </div>
                  <span className="text-2xl font-bold text-teal-600">+156</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <p className="font-semibold text-gray-800">Review Pending Recruiters</p>
                  <p className="text-sm text-gray-600">{stats.pendingRecruiters} waiting for approval</p>
                </button>
                <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <p className="font-semibold text-gray-800">Monitor Job Listings</p>
                  <p className="text-sm text-gray-600">Review flagged content</p>
                </button>
                <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <p className="font-semibold text-gray-800">User Reports</p>
                  <p className="text-sm text-gray-600">Check reported issues</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
